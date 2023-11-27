const CategoryButton = ({ children, onClick, isActive }) => {
  return <button className={`font-bold text-sm py-2 px-3 rounded-lg ${isActive ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-100' : 'bg-neutral-800 hover:bg-neutral-700'} whitespace-nowrap duration-200`} onClick={onClick}>{children}</button>
};



const CategoryList = ({ categoryList, handleCategoryOnClick, selectedCategoryId }) => {
  return (
    <div className='mr-8 flex gap-3 overflow-x-auto'>
      <CategoryButton onClick={() => handleCategoryOnClick('0')} isActive={selectedCategoryId === '0'}>All</CategoryButton>
      {categoryList.map((category, index) => (
        <CategoryButton
          key={index}
          onClick={() => handleCategoryOnClick(category.id)}
          isActive={category.id === selectedCategoryId}
        >
          {category.name}
        </CategoryButton>
      ))}
    </div>
  );
};



export default CategoryList;
