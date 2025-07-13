import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url({ message: 'VITE_API_URL deve ser uma URL válida' }).default('http://localhost:8080'),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  // Mostra todos os erros encontrados
  console.error('Erro(s) nas variáveis de ambiente:');
  parsed.error.issues.forEach((err) => {
    console.error(`- ${err.path.join('.')}: ${err.message}`);
  });
  throw new Error('Variáveis de ambiente inválidas. Corrija o arquivo .env.');
}

export const ENV = {
  API_URL: parsed.data.VITE_API_URL,
};