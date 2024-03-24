module.exports = {
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^(?:#assets|#components|#pages|#services|#utils|#libs)/(.*)$', '^[./]', '^[../]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
}
