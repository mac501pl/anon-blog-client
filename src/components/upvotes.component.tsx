import { IconButton } from '@material-ui/core';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import * as React from 'react';

interface IUpvotesProps {
  upvotes: number;
  handleUpvote: () => Promise<void>;
  handleDownvote: () => Promise<void>;
  isUpvoter: boolean;
  isDownvoter: boolean;
  small?: boolean;
}

const UpvotesComponent: React.FC<IUpvotesProps> = ({ upvotes, handleDownvote, handleUpvote, isUpvoter, isDownvoter, small }: IUpvotesProps): JSX.Element => (
  <div>
    <IconButton color={isUpvoter ? 'primary' : 'default'} onClick={handleUpvote}>
      <ThumbUp fontSize={small ? 'small' : 'default'} />
    </IconButton>
    {upvotes}
    <IconButton color={isDownvoter ? 'secondary' : 'default'} onClick={handleDownvote}>
      <ThumbDown fontSize={small ? 'small' : 'default'} />
    </IconButton>
  </div>
);

export default UpvotesComponent;
