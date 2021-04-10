import { sequelize } from '../../api/db_connection';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { Comment } from '../models/comment';
import { Reply } from '../models/reply';
import { Theme } from '../models/theme';
import { UserTheme } from '../models/userTheme';

export const modelUser = sequelize.define('user', User, { timestamps: false });
export const modelTopic = sequelize.define('topic', Topic, {
  timestamps: false
});
export const modelComment = sequelize.define('comment', Comment, {
  timestamps: false
});
export const modelReply = sequelize.define('reply', Reply, {
  timestamps: false
});
export const modelTheme = sequelize.define('theme', Theme, {
  timestamps: false
});
export const modelUserTheme = sequelize.define('users_theme', UserTheme, {
  timestamps: false
});

modelUser.hasMany(modelTopic);
//modelUser.hasMany(modelComment);
modelComment.hasOne(modelUser);
modelTopic.hasMany(modelComment);
modelComment.hasMany(modelReply);

export const initDataBase = () => {
  return sequelize
    .sync()
    .then(() => {
      console.log('connected');
    })
    .catch((err) => console.log(err));
};
export default sequelize;
