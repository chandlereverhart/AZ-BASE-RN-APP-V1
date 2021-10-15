import React from 'react';

import SpecialsListItem from './SpecialsListItem';
import EventsListItem from './EventsListItem';
import LocationsListItem from './LocationsListItem';
import NewsListItem from './NewsListItem';
import CardSkeleton from './CardSkeleton';
import AgendaSkeleton from './AgendaSkeleton';

export const SkeletonTypes = {
  SPECIALS_LIST_ITEM: 'SPECIALS_LIST_ITEM',
  EVENTS_LIST_ITEM: 'EVENTS_LIST_ITEM',
  LOCATIONS_LIST_ITEM: 'LOCATIONS_LIST_ITEM',
  NEWS_LIST_ITEM: 'NEWS_LIST_ITEM',
  CARD_SKELETON: 'CARD_SKELETON',
  AGENDA_SKELETON: 'AGENDA_SKELETON',
};

const Skeleton = ({type, ...rest}) => {
  if (type === SkeletonTypes.SPECIALS_LIST_ITEM) {
    return <SpecialsListItem {...rest} />;
  } else if (type === SkeletonTypes.EVENTS_LIST_ITEM) {
    return <EventsListItem {...rest} />;
  } else if (type === SkeletonTypes.VENDORS_LIST_ITEM) {
    return <EventsListItem {...rest} />;
  } else if (type === SkeletonTypes.LOCATIONS_LIST_ITEM) {
    return <LocationsListItem {...rest} />;
  } else if (type === SkeletonTypes.NEWS_LIST_ITEM) {
    return <NewsListItem {...rest} />;
  } else if (type === SkeletonTypes.CARD_SKELETON) {
    return <CardSkeleton {...rest} />;
  } else if (type === SkeletonTypes.AGENDA_SKELETON) {
    return <AgendaSkeleton {...rest} />;
  } else {
    return <SpecialsListItem {...rest} />;
  }
};

export default Skeleton;
