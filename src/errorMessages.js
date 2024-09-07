const errorMessages = {
  'auth/invalid-email': 'O endereço de e-mail está mal formatado.',
  'auth/user-not-found': 'Não há usuário registrado com esse e-mail.',
  'auth/wrong-password': 'Usuário e/ou senha incorretos.',
  'auth/invalid-credential': 'Credenciais inválidas fornecidas.',
  'auth/too-many-requests': 'Muitas tentativas de login. Tente novamente mais tarde.',
  'auth/network-request-failed': 'Erro de rede. Verifique sua conexão com a internet.',
  'auth/email-already-in-use': 'O endereço de e-mail já está em uso.',
  'auth/weak-password': 'A senha fornecida é muito fraca. Deve ter pelo menos 6 caracteres.',
  'auth/account-exists-with-different-credential': 'Já existe uma conta com esse e-mail, mas com credenciais diferentes.',
  'auth/popup-closed-by-user': 'A janela de autenticação foi fechada antes que a autenticação fosse concluída.',
  'auth/operation-not-allowed': 'Operação não permitida. Verifique as configurações de autenticação no console do Firebase.',
  'auth/requires-recent-login': 'A operação requer um login recente. Faça login novamente e tente novamente.',
  'auth/expired-action-code': 'O código de ação expirou. Solicite um novo link de verificação.',
  'auth/invalid-action-code': 'O código de ação fornecido é inválido.',
};

export const getErrorMessage = (code) => {
  return errorMessages[code] || 'Ocorreu um erro. Por favor, tente novamente.';
};
