import dotenv from 'dotenv';
import path from 'path';

import app from './app';
// import mongoose from 'mongoose';
// import createError from 'http-errors';

dotenv.config({
  path: path.join(__dirname, '.env')
});

// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true
//   })
//   .then(() => {
//     console.log('Connection mongodb success!!!');
//   })
//   .catch((error) => console.log(error));

const PORT = process.env.PORT || 8001;

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (
  err: { message: any; status: any },
  req: { app: { get: (arg0: string) => string } },
  res: {
    locals: { message: any; error: any };
    status: (arg0: any) => void;
    render: (arg0: string) => void;
  },
  next: any
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () =>
  console.log(`Frontend service listening on port: ${PORT}`)
);
