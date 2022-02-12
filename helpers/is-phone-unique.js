export const isPhoneUnique = async (Model, phone) =>{
  const user = await Model.findOne({where: {phone}});
  return !user;
};
