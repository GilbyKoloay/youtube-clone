const CategoryList = () => {
  return (
    <div className='mr-8 flex gap-3 overflow-x-auto'>
      <CategoryButton isActive>All</CategoryButton>
      <CategoryButton>Animation & Film</CategoryButton>
      <CategoryButton>Autos & Vehicles</CategoryButton>
      <CategoryButton>Music Videos</CategoryButton>
      <CategoryButton>Pets & Animals</CategoryButton>
      <CategoryButton>Sports</CategoryButton>
      <CategoryButton>Travel & Events</CategoryButton>
      <CategoryButton>Sports</CategoryButton>
      <CategoryButton>Gaming</CategoryButton>
      <CategoryButton>People & Blogs</CategoryButton>
      <CategoryButton>Comedy</CategoryButton>
      <CategoryButton>Entertainment</CategoryButton>
      <CategoryButton>News & Politics</CategoryButton>
      <CategoryButton>How to & Style</CategoryButton>
      <CategoryButton>Education</CategoryButton>
      <CategoryButton>Science & Technology</CategoryButton>
      <CategoryButton>NonProfit & Activism</CategoryButton>
    </div>
  );
};

const CategoryButton = ({ children, isActive }) => {
  return <button className={`font-bold text-sm py-2 px-3 rounded-lg ${isActive ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-100' : 'bg-neutral-800 hover:bg-neutral-700'} whitespace-nowrap duration-200`}>{children}</button>
};



export default CategoryList;
