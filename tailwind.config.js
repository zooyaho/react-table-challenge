module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /^text-(left|center|right)$/, // 동적 클래스 패턴
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
