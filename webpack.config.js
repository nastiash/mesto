//подключаем path к конфигу вебпак
const path = require('path');
//подключаем плагин для работы с HTML-файлами
const HtmlWebpackPlugin = require('html-webpack-plugin');
//подключани плагин для очистки папки dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//подключаем к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  //указываем первое место, куда заглянет webpack
  entry: { main: './src/pages/index.js' },
  //указываем в какой файл будет собираться весь js и дали ему имя
  output: {
    //переписываем точку выхода, используя утилиту path
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
            publicPath: ''
},
//добавляем режим разработчика
mode: 'development',
devServer: {
  //путь, куда "смотрит" режим разработчика
  contentBase: path.resolve(__dirname, './dist'),
  //ускорить загрузку в режиме разработки
  compress: true,
  //порт, чтобы открывать сайт по адресу localhost:8080 (порт можно поменять)
  port: 8080,
//сайт будет открываться сам при запуске npm run dev
  open: true
},
module: {
  //массив правил rules
  rules: [
    //объект правил для бабеля
    {
      //ищем все JS файлы регулярным выражением
      test: /\.js$/,
      //используем babel-loader при обработке этих файлов
      use: 'babel-loader',
      //исключаем из обработки файлы в папке node_modules
      exclude: '/node_modules/'
    },
    {
      //регулярное выражение, которое ищет все медиа-файлы
      test: /\.(png|svg|jpg|ico|gif|woff(2)?|eot|ttf|otf)$/,
      //переносим исходные файлы в конечную сборку в том же формате
      type: 'asset/resource'
    },
  {
    //ищем все CSS файлы регулярным выражением
    test: /\.css$/,
    //при обработке используем MiniCssExtractPlugin.loader и css-loader
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      //добавляем объект options
      //1 - некоторые трансформации PostCSS нужно применить до css-loader
      options: { importLoaders: 1 }
      },
      //добавляем postcss-loader
      'postcss-loader']
  }
    ]
},
//массив плагинов
plugins: [
  //передаём объект опций
  new HtmlWebpackPlugin({
    //путь к файлу index.html
    template: './src/index.html'
  }),
  //вызываем плагин для очистки содержимого папки dist
  new CleanWebpackPlugin(),
  //вызываем плагин для объединения CSS-файлов
  new MiniCssExtractPlugin()
]
}
