// Recupera o email da página anterior (armazenado na URL ou localStorage)
        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const email = urlParams.get('email');
            
            if (email) {
                document.getElementById('userEmail').textContent = email;
            }
        });

        const inputs = document.querySelectorAll('.code_inputs input');

        // Auto-foco no próximo campo
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // Move para o próximo campo
                if (value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                
                // Aceita apenas números
                e.target.value = value.replace(/[^0-9]/g, '');
            });

            // Navegação com teclado
            input.addEventListener('keydown', (e) => {
                // Backspace volta para o campo anterior
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputs[index - 1].focus();
                }
                
                // Setas para navegar
                if (e.key === 'ArrowLeft' && index > 0) {
                    inputs[index - 1].focus();
                }
                
                if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Suporte para colar código
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
                
                pastedData.split('').forEach((char, i) => {
                    if (index + i < inputs.length) {
                        inputs[index + i].value = char;
                    }
                });
                
                // Move o foco para o último campo preenchido
                const nextIndex = Math.min(index + pastedData.length, inputs.length - 1);
                inputs[nextIndex].focus();
            });
        });

        function verifyCode() {
            const code = Array.from(inputs).map(input => input.value).join('');
            
            if (code.length === 6) {
                console.log('Código digitado:', code);
                // Aqui você pode adicionar a lógica de verificação
                alert(`Verificando código: ${code}`);
                // window.location.href = 'proxima-pagina.html';
            } else {
                alert('Por favor, digite o código completo de 6 dígitos.');
                inputs[0].focus();
            }
        }

        function resendCode(e) {
            e.preventDefault();
            alert('Novo código enviado para seu email!');
            // Aqui você pode adicionar a lógica de reenvio
        }

        // Foco automático no primeiro campo
        inputs[0].focus();