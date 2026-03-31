function enviarCodigo() {
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            // Validação básica do email
            if (!email) {
                alert('Por favor, digite seu e-mail.');
                emailInput.focus();
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                alert('Por favor, digite um e-mail válido.');
                emailInput.focus();
                return;
            }
            
            // Aqui você pode adicionar a chamada para o backend enviar o código
            // Por exemplo: fetch('/api/enviar-codigo', { method: 'POST', body: JSON.stringify({ email }) })
            
            // Redireciona para a página de código passando o email na URL
            window.location.href = './codigo_email.html?email=' + encodeURIComponent(email);
        }