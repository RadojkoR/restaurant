import { useEffect, useState } from 'react'
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';
import MenuItemCard from './MenuItemCard';
import { menuItemModel } from '../../../Interfaces/Index';
import { RootState } from '../../../Storage/Redux/store';
import { SD_SortTypes } from '../../../Utility/SD';
import "../../../Style/home.css"

function MenuItemList() {
    const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categoryList, setCategoryList] = useState([""])
    const dispatch = useDispatch();
    const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
    const {data, isLoading} = useGetMenuItemsQuery(null);
    const sortOptions: Array<SD_SortTypes> = [
      SD_SortTypes.PRICE_LOW_HIGH,
      SD_SortTypes.PRICE_HIGH_LOW,
      SD_SortTypes.NAME_A_Z,
      SD_SortTypes.NAME_Z_A,
    ]

    const searchValue = useSelector(
      (state: RootState) => state.menuItemStore.search
    );

    useEffect(() => {
      if (data && data.result) {
        const tempMenuArray = handleFilters(sortName,selectedCategory,searchValue);
        setMenuItems(tempMenuArray)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    useEffect(() => {
      if(!isLoading){
        dispatch(setMenuItem(data.result));
        setMenuItems(data.result);
         const tempCategoryList = ["All"];
         data.result.forEach((item: menuItemModel) => {
           if (tempCategoryList.indexOf(item.category) === -1) {
             tempCategoryList.push(item.category);
           }
         });
         setCategoryList(tempCategoryList);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    const handleSortClick = (i: number) => {
      setSortName(sortOptions[i]);
      const tempArray = handleFilters(
        sortOptions[i],
        selectedCategory,
        searchValue
      )
      setMenuItems(tempArray)
    }

    const handleCategoryClick = (i: number) => {
      const buttons = document.querySelectorAll(".custom-buttons");
      let localCategory;
      buttons.forEach((button,index)=>{
        if(index === i){
          button.classList.add("active");

          if (index === 0) {
            localCategory = "All";
          } else {
            localCategory = categoryList[index];
          }
          setSelectedCategory(localCategory);
          const tempArray = handleFilters(sortName,localCategory, searchValue);
          setMenuItems(tempArray);
        } else {
          button.classList.remove("active");
        }
        
      })
    }

    const handleFilters = (sortType: SD_SortTypes,category: string, search: string) => {
      let tempArray = category === "All" ? [...data.result] : data.result.filter((item:menuItemModel)=>item.category.toUpperCase() === category.toUpperCase())

      if(search) {
        const tempArray2 = [...tempArray];
        tempArray = tempArray2.filter((itrem:menuItemModel) => itrem.name.toUpperCase().includes(search.toUpperCase()))
      }

      //sort
      if(sortType === SD_SortTypes.PRICE_LOW_HIGH) {
        tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price)
      }
       if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
         tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price
         );
       }
       if (sortType === SD_SortTypes.NAME_A_Z) {
         tempArray.sort(
           (a: menuItemModel, b: menuItemModel) => a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0)
         );
       }
        if (sortType === SD_SortTypes.NAME_Z_A) {
         tempArray.sort(
           (a: menuItemModel, b: menuItemModel) => b.name.toUpperCase().charCodeAt(0) - a.name.toUpperCase().charCodeAt(0)
         );
       }

      return tempArray;
    }

    if(isLoading){
      return <MainLoader />;
    }

  return (
    <div className="container-fluid row">
      <div className="my-3 p-0">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li
              className="nav-item categoryListItem"
              key={index}
              style={{ ...(index === 0 && { marginLeft: "auto" }) }}
            >
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown sortBy">
            <div
              className="nav-link dropdown-toggle text-dark border sortByDiv"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
              <ul className="dropdown-menu sortByDropdown">
                {sortOptions.map((sortType, index) => (
                  <li
                    className="dropdown-item"
                    key={index}
                    onClick={() => handleSortClick(index)}
                  >
                    {sortType}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
    </div>
  );
}

export default MenuItemList