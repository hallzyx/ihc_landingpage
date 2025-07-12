class DiaLearnChatbot {
    constructor() {
        this.apiUrl = 'https://n8n.arroz.dev/webhook/20ea52ba-8fc3-4cfb-8f0b-603aed8fa376';
        this.isOpen = false;
        this.isLoading = false;
        this.messages = [];
        this.developmentMode = false; // Cambiar a true para modo de desarrollo
        
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.loadWelcomeMessage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Botón flotante del chatbot -->
            <div id="chatbot-button" class="chatbot-button" aria-label="Abrir chat de ayuda">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 9H16M8 13H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="chatbot-notification" id="chatbot-notification">1</div>
            </div>

            <!-- Ventana del chat -->
            <div id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10 11.63 10 12.17V23H12V18H14V23H16V12.17C16 11.63 15.79 11.13 15.41 10.75L19.83 6.33L22.5 9L21 9Z" fill="currentColor"/>
                            </svg>
                        </div>
                        <div class="chatbot-info">
                            <h3>DiaLearn Assistant</h3>
                            <span class="chatbot-status">En línea</span>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close-btn" aria-label="Cerrar chat">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Los mensajes se añadirán aquí dinámicamente -->
                </div>

                <div class="chatbot-input-container">
                    <div class="chatbot-input-wrapper">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            class="chatbot-input" 
                            placeholder="Escribe tu mensaje..."
                            maxlength="500"
                        >
                        <button id="chatbot-send" class="chatbot-send-btn" aria-label="Enviar mensaje">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="chatbot-typing-indicator" id="chatbot-typing">
                        <div class="chatbot-typing-content">
                            <span class="chatbot-typing-text">Escribiendo</span>
                            <div class="chatbot-typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insertar el HTML al final del body
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const chatbotButton = document.getElementById('chatbot-button');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-input');

        // Abrir/cerrar chat
        chatbotButton.addEventListener('click', () => this.toggleChat());
        chatbotClose.addEventListener('click', () => this.closeChat());

        // Enviar mensaje
        chatbotSend.addEventListener('click', () => this.sendMessage());
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Cerrar chat al hacer clic fuera
        document.addEventListener('click', (e) => {
            const chatWindow = document.getElementById('chatbot-window');
            const chatButton = document.getElementById('chatbot-button');
            
            if (this.isOpen && !chatWindow.contains(e.target) && !chatButton.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    loadWelcomeMessage() {
        const welcomeText = this.developmentMode ? 
            "**¡Hola!** Soy el asistente virtual de **DiaLearn** *(modo demo)*.\n\n¿En qué puedo ayudarte hoy? 😊" :
            "**¡Hola!** Soy el asistente virtual de **DiaLearn**.\n\n¿En qué puedo ayudarte hoy? 😊";
            
        const welcomeMessage = {
            text: welcomeText,
            isBot: true,
            timestamp: new Date()
        };
        this.addMessage(welcomeMessage);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const chatWindow = document.getElementById('chatbot-window');
        const notification = document.getElementById('chatbot-notification');
        
        chatWindow.classList.add('chatbot-window-open');
        this.isOpen = true;
        
        // Ocultar notificación
        if (notification) {
            notification.style.display = 'none';
        }
        
        // Enfocar el input
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 300);
        
        // Scroll al último mensaje
        this.scrollToBottom();
    }

    closeChat() {
        const chatWindow = document.getElementById('chatbot-window');
        chatWindow.classList.remove('chatbot-window-open');
        this.isOpen = false;
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;
        
        // Limpiar input
        input.value = '';
        
        // Añadir mensaje del usuario
        this.addMessage({
            text: message,
            isBot: false,
            timestamp: new Date()
        });
        
        // Mostrar indicador de escritura
        this.showTypingIndicator();
        
        try {
            // Enviar mensaje al webhook o simular respuesta
            const response = this.developmentMode ? 
                await this.simulateResponse(message) : 
                await this.callWebhook(message);
            
            // Ocultar indicador de escritura
            this.hideTypingIndicator();
            
            // Añadir respuesta del bot
            this.addMessage({
                text: response.message || 'Lo siento, no pude procesar tu mensaje. Por favor, inténtalo de nuevo.',
                isBot: true,
                timestamp: new Date()
            });
            
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            
            this.hideTypingIndicator();
            
            // Mensajes de error más específicos
            if (error.message.includes('404') && error.message.includes('not registered')) {
                this.addMessage({
                    text: '🔧 **Webhook no registrado**\n\n**El workflow de n8n no está activo.** Para solucionarlo:\n\n1️⃣ Ve a tu dashboard de n8n\n2️⃣ Abre el workflow del chatbot\n3️⃣ **Activa el workflow** (toggle superior derecha)\n4️⃣ Cambia de "test mode" a "production mode"\n\n🎯 **Alternativamente**: Haz clic en "Execute workflow" para una prueba única.',
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            } else if (error.message.includes('404')) {
                this.addMessage({
                    text: '🚧 **Webhook no encontrado (404)**\n\nPosibles causas:\n• El workflow de n8n está pausado\n• La URL del webhook ha cambiado\n• El endpoint no existe\n\n💡 **Solución**: Verifica que el workflow esté activo en n8n.',
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            } else if (error.message.includes('405')) {
                this.addMessage({
                    text: '❌ **Método no permitido (405)**\n\nEl servidor no acepta peticiones POST. Verifica la configuración del webhook en n8n.',
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            } else if (error.message.includes('500')) {
                this.addMessage({
                    text: '⚠️ **Error del servidor (500)**\n\nHay un problema en el workflow de n8n. Revisa los logs del workflow.',
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            } else if (error.message.includes('conexión')) {
                this.addMessage({
                    text: '🌐 **Error de conexión**\n\nNo se puede conectar al servidor. Verifica tu conexión a internet.',
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            } else if (error.message.includes('CORS')) {
                this.addMessage({
                    text: '🔒 **Error de CORS**\n\nEl servidor no permite peticiones desde este dominio. Configura CORS en n8n.',
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            } else {
                // Mensaje de error genérico
                this.addMessage({
                    text: `❗ **Error inesperado**\n\n${error.message}\n\nPor favor, revisa la consola del navegador (F12) para más detalles.`,
                    isBot: true,
                    timestamp: new Date(),
                    isError: true
                });
            }
        }
    }

    async simulateResponse(message) {
        // Simular demora de red (más tiempo para ver el indicador)
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
        
        // Respuestas simuladas basadas en palabras clave
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hola') || lowerMessage.includes('hello')) {
            return { message: "¡Hola! Es un placer conversar contigo. Soy el asistente virtual de DiaLearn y estoy aquí para ayudarte con cualquier pregunta sobre nuestra aplicación educativa." };
        }
        
        if (lowerMessage.includes('diallearn') || lowerMessage.includes('app')) {
            return { message: "**DiaLearn** es una aplicación revolucionaria que usa *inteligencia artificial* para organizar tus apuntes automáticamente según tu horario académico.\n\n¿Te gustaría saber más sobre alguna característica específica?" };
        }
        
        if (lowerMessage.includes('funciona') || lowerMessage.includes('como')) {
            return { message: "## ¿Cómo funciona DiaLearn?\n\n**¡Excelente pregunta!** DiaLearn funciona de manera muy sencilla:\n\n1. **Tomas fotos** de tus apuntes en clase\n2. **Nuestra IA** los clasifica automáticamente por materia y horario\n3. **Convierte el contenido** en material didáctico estructurado que puedes revisar fácilmente\n\n¡Es así de simple! 😊" };
        }
        
        if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('gratis')) {
            return { message: "## Planes y Precios\n\nEstamos trabajando en diferentes **planes flexibles** para adaptarnos a las necesidades de todos los estudiantes:\n\n• Plan estudiante\n• Plan premium\n• Plan institucional\n\n¡Pronto tendremos más información! Mientras tanto, puedes probar la app y ver todo lo que puede hacer por ti. 🎓" };
        }
        
        if (lowerMessage.includes('descarga') || lowerMessage.includes('install')) {
            return { message: "## ¡Descarga DiaLearn ahora!\n\n**¡Genial que quieras probar DiaLearn!** Puedes descargar la app de estas formas:\n\n• **Escanea los códigos QR** que aparecen en nuestra página\n• Disponible para **iOS** y **Android**\n• Instalación rápida y sencilla\n\n¡En unos minutos estarás organizando tus apuntes como nunca antes! 📱✨" };
        }
        
        if (lowerMessage.includes('ayuda') || lowerMessage.includes('help') || lowerMessage.includes('soporte')) {
            return { message: "## ¿En qué puedo ayudarte?\n\n**¡Por supuesto que te ayudo!** Puedo responder preguntas sobre:\n\n• **DiaLearn** - Cómo funciona nuestra app\n• **Características** - Todas las funcionalidades\n• **Descarga** - Cómo obtener la app\n• **Precios** - Planes disponibles\n• **Soporte técnico** - Ayuda adicional\n\n¿Hay algo específico que te gustaría saber? 🤔" };
        }
        
        if (lowerMessage.includes('gracias') || lowerMessage.includes('thank')) {
            return { message: "¡De nada! Es un placer ayudarte. Si tienes más preguntas sobre DiaLearn o necesitas ayuda con algo más, no dudes en preguntarme. ¡Estoy aquí para ayudarte!" };
        }
        
        if (lowerMessage.includes('adiós') || lowerMessage.includes('bye') || lowerMessage.includes('chau')) {
            return { message: "¡Hasta pronto! Espero haberte ayudado. Recuerda que puedes volver cuando quieras para conocer más sobre DiaLearn. ¡Que tengas un excelente día!" };
        }
        
        // Respuesta por defecto
        const defaultResponses = [
            "Interesante pregunta. DiaLearn está diseñado para hacer tu vida académica más fácil y organizada. ¿Te gustaría saber más sobre alguna característica específica?",
            "¡Perfecto! Como asistente de DiaLearn, puedo contarte sobre cómo nuestra IA puede transformar la manera en que organizas tus estudios. ¿Qué te gustaría saber?",
            "Esa es una buena pregunta. DiaLearn es más que una simple app de notas: es tu compañero inteligente de estudio. ¿Hay algo particular sobre la app que te interese?",
            "¡Excelente! Me encanta ayudar a los estudiantes a descubrir cómo DiaLearn puede mejorar su experiencia de aprendizaje. ¿En qué puedo ayudarte específicamente?"
        ];
        
        const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        return { message: randomResponse };
    }

    async callWebhook(message) {
        this.isLoading = true;
        
        const requestBody = {
            message: message
        };
        
        console.log('Enviando mensaje al webhook (POST):', this.apiUrl);
        console.log('Cuerpo de la petición:', requestBody);
        
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Añadir headers que a veces requiere n8n
                    'User-Agent': 'DiaLearn-Chatbot/1.0'
                },
                body: JSON.stringify(requestBody)
            });
            
            console.log('Respuesta del servidor:', response.status, response.statusText);
            console.log('Headers de respuesta:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                // Intentar leer el contenido de la respuesta para más información
                let errorText = '';
                try {
                    errorText = await response.text();
                    console.error('Contenido del error:', errorText);
                } catch (e) {
                    console.error('No se pudo leer el contenido del error');
                }
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. ${errorText}`);
            }
            
            // Manejar diferentes tipos de respuesta
            const contentType = response.headers.get('content-type');
            console.log('Content-Type de la respuesta:', contentType);
            
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Respuesta exitosa (JSON):', data);
                return data;
            } else if (contentType && contentType.includes('text/')) {
                // Si es texto plano, encapsular en el formato esperado
                const textData = await response.text();
                console.log('Respuesta exitosa (texto):', textData);
                return { message: textData };
            } else {
                // Intentar como JSON primero, luego como texto
                try {
                    const data = await response.json();
                    console.log('Respuesta exitosa (JSON sin header):', data);
                    return data;
                } catch {
                    const textData = await response.text();
                    console.log('Respuesta exitosa (texto sin header):', textData);
                    return { message: textData };
                }
            }
            
        } catch (error) {
            console.error('Error en la llamada al webhook:', error);
            console.error('URL:', this.apiUrl);
            console.error('Método:', 'POST');
            console.error('Headers:', { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'User-Agent': 'DiaLearn-Chatbot/1.0'
            });
            console.error('Body:', JSON.stringify(requestBody));
            
            // Verificar si es un error de red o del servidor
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Error de conexión: No se puede conectar al servidor. Verifica tu conexión a internet.');
            }
            
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    addMessage(messageData) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageElement = this.createMessageElement(messageData);
        
        messagesContainer.appendChild(messageElement);
        this.messages.push(messageData);
        
        // Scroll al final después de añadir el mensaje
        setTimeout(() => this.scrollToBottom(), 100);
    }

    createMessageElement(messageData) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${messageData.isBot ? 'chatbot-message-bot' : 'chatbot-message-user'}`;
        
        if (messageData.isError) {
            messageDiv.classList.add('chatbot-message-error');
        }
        
        const time = messageData.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Procesar el texto del mensaje (Markdown para bots, escape HTML para usuarios)
        const processedText = messageData.isBot ? 
            this.renderMarkdown(messageData.text) : 
            this.escapeHtml(messageData.text);
        
        messageDiv.innerHTML = `
            <div class="chatbot-message-content">
                ${messageData.isBot ? '<div class="chatbot-message-avatar"></div>' : ''}
                <div class="chatbot-message-bubble">
                    <div class="chatbot-message-text">${processedText}</div>
                    <span class="chatbot-message-time">${time}</span>
                </div>
            </div>
        `;
        
        return messageDiv;
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('chatbot-typing');
        typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('chatbot-typing');
        typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    renderMarkdown(text) {
        // Primero escapar HTML para seguridad
        let html = this.escapeHtml(text);
        
        // Convertir Markdown a HTML
        
        // Headers (# ## ###)
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Texto en negrita (**texto** o __texto__)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
        
        // Texto en cursiva (*texto* o _texto_)
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.*?)_/g, '<em>$1</em>');
        
        // Código inline (`código`)
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // Enlaces [texto](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // Líneas horizontales (---)
        html = html.replace(/^---$/gm, '<hr>');
        
        // Listas no ordenadas (• o -)
        html = html.replace(/^[•\-] (.+)$/gm, '<li>$1</li>');
        
        // Listas ordenadas (1. 2. etc.)
        html = html.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
        
        // Emojis especiales para el chatbot
        html = html.replace(/:\)/g, '😊');
        html = html.replace(/:\(/g, '😞');
        html = html.replace(/:D/g, '😃');
        html = html.replace(/;\)/g, '😉');
        
        // Wrap listas en elementos <ul> o <ol>
        html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
            // Si hay números, usar ol, sino ul
            if (text.includes('1.') || text.includes('2.') || text.includes('3.')) {
                return '<ol>' + match + '</ol>';
            } else {
                return '<ul>' + match + '</ul>';
            }
        });
        
        // Convertir saltos de línea a <br> (solo simples, dobles quedan como párrafos)
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');
        
        // Envolver en párrafos si no hay otros elementos de bloque
        if (!html.includes('<h') && !html.includes('<ul>') && !html.includes('<ol>') && !html.includes('<hr>')) {
            html = '<p>' + html + '</p>';
        }
        
        return html;
    }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new DiaLearnChatbot();
});
