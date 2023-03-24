import { ThingApplicationStatus } from '@prisma/client';
import { Badge } from 'flowbite-react';
import React from 'react';

interface ApplicationStatusBadgeProps {
  status: ThingApplicationStatus;
}

const ApplicationStatusBadge: React.FC<ApplicationStatusBadgeProps> = ({ status }) => {
  if (status === 'PENDING') {
    return (
      <Badge color="gray">
        PENDING
      </Badge>
    );
  } if (status === 'REJECTED' || status === 'CANCELED') {
    return (
      <Badge color="failure">
        REJECTED
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
      { status }
    </Badge>
  );
};

export default ApplicationStatusBadge;
