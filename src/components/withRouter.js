import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
 
const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
      {...{ navigate, /* other hooks */ }}
    />
  );
};
 
export default withRouter;