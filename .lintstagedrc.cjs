module.exports = {
  '*.ts': [
    () => 'npx tsc --noEmit',
    'eslint --fix',
    'prettier --write',
  ],
}
