import { ThingApplicationStatus } from '@prisma/client';
import { Badge } from 'flowbite-react';
import React from 'react';

interface ApplicationStatusBadgeProps {
  status: ThingApplicationStatus;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
  const cleanStatus = status.replace(/_/g, ' ');

  if (status === 'PENDING') {
    return (
      <Badge color="gray">
        PENDING
      </Badge>
    );
  } if (status === 'REJECTED' || status === 'CANCELED') {
    return (
      <Badge color="failure">
        { cleanStatus }
      </Badge>
    );
  } if (status === 'RETURNED') {
    return (
      <Badge color="success">
        RETURNED
      </Badge>
    );
  }

  return (
    <Badge color="info">
      { cleanStatus }
    </Badge>
  );
};

export default ApplicationStatusBadge;
