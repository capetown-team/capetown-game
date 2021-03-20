import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts, fetchUsers } from '../../redux/action';
import { fetchUsers } from '@/reducers/post/actions';
import { postSelector } from '@/reducers/post/selectors';

export const Posts = () => {
  const dispatch = useDispatch();

  // const users = useSelector((state) => state.users.users);
  // const users = [];
  const user = useSelector(postSelector);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log('us', user);
    setUsers(user);
  }, [user]);

  return (
    <section className="post-item">
      {users.map(
        (el: {
          id: string | number | null | undefined;
          name: React.ReactNode;
        }) => {
          return (
            <div key={el.id}>
              <h3>{el.name}</h3>
            </div>
          );
        }
      )}
    </section>
  );
};

// Posts.fetching = ({ dispatch, path }: { dispatch: any; path: string }) => {
//   console.log('PATH', path);
//   return [dispatch(fetchUsers())];
// };

export default Posts;
