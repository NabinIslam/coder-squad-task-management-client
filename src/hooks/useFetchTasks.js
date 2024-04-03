import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/auth';

const useFetchTasks = (page = '') => {
  const { user } = useAuth();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [page],
    queryFn: () =>
      fetch(
        `https://coder-squad-task-management-server.onrender.com/api/tasks/user/id/${user._id}?page=${page}`
      )
        .then(res => res.json())
        .catch(err => console.error(err)),
  });

  return { data, isLoading, isFetching, refetch };
};

export default useFetchTasks;
