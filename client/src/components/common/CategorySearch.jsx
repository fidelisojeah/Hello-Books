import React from 'react';
import PropTypes from 'prop-types';

import TextField from './TextField';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} div element
 */
function CategorySearch(props) {
  const categoriesDiv =
    Array.isArray(props.categoryDetails) ?
      props
        .categoryDetails.map((category, index) =>
          (
            <li key={category.id}>{category.name}
              <button
                onClick={event => props.handleCategoryRemove(event, index)}
              >
                &times;
            </button>
            </li>
          )
        ) : '';
  const categoryList =
    Array.isArray(props.categoryList) ?
      props
        .categoryList.map((categories) => {
          if (props.bookCategories.indexOf(categories.id) === -1) {
            return (
              <li
                key={categories.id}
              >
                <span
                  role="presentation"
                  className="category-list-span"
                  key={categories.id}
                  onMouseDown={event => props.onCategoryMouseDown(event, categories)}
                >
                  {categories.categoryName}
                </span>
              </li >
            );
          }
          return null;
        })
      : (
        <li>No Categories Found</li>
      );
  return (
    <div>
      <TextField
        compoundError={props.compoundError}
        isRequired={false}
        label="Add Category"
        onChange={props.onCategoryChange}
        field="categoryField"
        value={props.categoryField}
        checkExists={props.onBlurEvent}
        formField="form-group"
        type="text"
        autocomplete="off"
      />
      <input
        type="hidden"
        name="categories"
        value={props.bookCategories.join()}
        required="required"
      />
      {categoriesDiv &&
        <div className="row">
          <ul className="selected-Categories">
            {categoriesDiv}
          </ul>
        </div>
      }
      <ul className="category-list" id="listCategories">
        {categoryList}
      </ul>
    </div >
  );
}

CategorySearch.propTypes = {
  categoryField: PropTypes.string,
  bookCategories: PropTypes.arrayOf(PropTypes.number),
  categoryDetails: PropTypes.array,
  categoryList: PropTypes
    .oneOfType(
    [
      PropTypes.string,
      PropTypes.array]
    ),
  onCategoryChange: PropTypes.func.isRequired,
  onBlurEvent: PropTypes.func.isRequired,
  compoundError: PropTypes.arrayOf(PropTypes.object)
};
CategorySearch.defaultProps = {
  categoryField: '',
  categoryList: [],
  bookCategories: [],
  categoryDetails: [],
  compoundError: [],
};
export default CategorySearch;
