// local
// require('dotenv').config()
// const express = require('express');
// const path = require('path');
// const initQuizRoutes = require('./routes/QuizRoute.js');
// const initAdminRoutes = require('./routes/AdminRoute.js');
// const initQuestionRoutes = require('./routes/QuestionRoute.js');
// const initAnswerRoutes = require('./routes/AnswerRoute.js');
// const initCategoryRoutes = require('./routes/CategoryRoute.js');
// const configCors = require('./config/cors.js');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser')
// const app = express()

// app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));

// configCors(app)

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));

// app.use(cookieParser())

// initQuizRoutes(app)
// initAdminRoutes(app)
// initQuestionRoutes(app)
// initAnswerRoutes(app)
// initCategoryRoutes(app)

// app.listen(process.env.PORT, () => {
//   console.log('>>> Server running on PORT:', process.env.PORT)
// })



// render
require('dotenv').config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const initQuizRoutes = require('./routes/QuizRoute.js');
const initAdminRoutes = require('./routes/AdminRoute.js');
const initQuestionRoutes = require('./routes/QuestionRoute.js');
const initAnswerRoutes = require('./routes/AnswerRoute.js');
const initCategoryRoutes = require('./routes/CategoryRoute.js');
const configCors = require('./config/cors.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express()

// ping route for free render
app.get('/ping', (req, res) => {
  res.status(200).send('Server is alive!');
});

let uploadDir;

if (__dirname.includes('build')) {
  uploadDir = path.join(process.cwd(), 'public', 'uploads');
  console.log('>>> 🚀 Đang chạy trên RENDER. Thư mục uploads hoạt động:', uploadDir);

  const sourceDir = path.join(process.cwd(), 'src', 'public', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('>>> 🎉 Đã tự động tạo thư mục đích public/uploads ở gốc.');
  }

  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(uploadDir, file);

      if (!fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`>>> 📂 Đã đồng bộ ảnh chuẩn bị sẵn: ${file}`);
      }
    });
  }
} else {
  uploadDir = path.join(__dirname, './public/uploads');
  console.log('>>> 💻 Đang chạy dưới LOCAL. Thư mục uploads:', uploadDir);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('>>> 🎉 Đã tự động tạo thư mục public/uploads tại local:', uploadDir);
  }
}

app.use('/uploads', express.static(uploadDir));

configCors(app)

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cookieParser())

initQuizRoutes(app)
initAdminRoutes(app)
initQuestionRoutes(app)
initAnswerRoutes(app)
initCategoryRoutes(app)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('>>> 🖥️ Server đang chạy tại PORT:', PORT)
})