/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM({
  reactStrictMode: true,

  env: {
    'MYSQL_HOST': '192.168.1.102',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': "stock",
    'MYSQL_USER': "vlongo",
    'MYSQL_PASSWORD': "nokia5800",
  },
});



