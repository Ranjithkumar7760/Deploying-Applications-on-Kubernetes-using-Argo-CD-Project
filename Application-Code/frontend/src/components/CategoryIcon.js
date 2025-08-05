import React from 'react';
import {
  Restaurant as FoodIcon,
  DirectionsCar as TransportationIcon,
  Movie as EntertainmentIcon,
  ShoppingCart as ShoppingIcon,
  Receipt as BillsIcon,
  LocalHospital as HealthcareIcon,
  School as EducationIcon,
  Category as OtherIcon,
} from '@material-ui/icons';

const CategoryIcon = ({ category, size = 24, color = '#667eea' }) => {
  const iconProps = { style: { fontSize: size, color } };

  const icons = {
    Food: <FoodIcon {...iconProps} />,
    Transportation: <TransportationIcon {...iconProps} />,
    Entertainment: <EntertainmentIcon {...iconProps} />,
    Shopping: <ShoppingIcon {...iconProps} />,
    Bills: <BillsIcon {...iconProps} />,
    Healthcare: <HealthcareIcon {...iconProps} />,
    Education: <EducationIcon {...iconProps} />,
    Other: <OtherIcon {...iconProps} />,
  };

  return icons[category] || icons.Other;
};

export default CategoryIcon;