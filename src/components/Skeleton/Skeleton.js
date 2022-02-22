import React from "react";

import EventsListItem from "./EventsListItem";
import LocationsListItem from "./LocationsListItem";
import NewsListItem from "./NewsListItem";
import CardSkeleton from "./CardSkeleton";

export const SkeletonTypes = {
  SPECIALS_LIST_ITEM: "SPECIALS_LIST_ITEM",
  EVENTS_LIST_ITEM: "EVENTS_LIST_ITEM",
  LOCATIONS_LIST_ITEM: "LOCATIONS_LIST_ITEM",
  NEWS_LIST_ITEM: "NEWS_LIST_ITEM",
  CARD_SKELETON: "CARD_SKELETON",
  AGENDA_SKELETON: "AGENDA_SKELETON",
};

const Skeleton = ({ type, ...rest }) => {
  if (type === SkeletonTypes.EVENTS_LIST_ITEM) {
    return <EventsListItem {...rest} />;
  } else if (type === SkeletonTypes.LOCATIONS_LIST_ITEM) {
    return <LocationsListItem {...rest} />;
  } else if (type === SkeletonTypes.NEWS_LIST_ITEM) {
    return <NewsListItem {...rest} />;
  } else if (type === SkeletonTypes.CARD_SKELETON) {
    return <CardSkeleton {...rest} />;
  } else {
    return <EventsListItem {...rest} />;
  }
};

export default Skeleton;
