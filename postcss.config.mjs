/** @type {import('postcss-load-config').Config} */
// Esse comentário ajuda a tipar o objeto de configuração, garantindo que ele siga as expectativas do PostCSS

const config = {
  plugins: {
    tailwindcss: {}, // O Tailwind CSS é adicionado como um plugin para o PostCSS
  },
};

export default config; // Exporta a configuração para que o PostCSS a use ao processar os arquivos CSS
