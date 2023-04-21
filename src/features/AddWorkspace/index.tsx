import React from 'react';
import './index.scss';
import TagInput from './components/TagInput';
import tick from '../../app/assets/images/tick.png';

const AddWorkspace = () => {
  return (
    <div>
      <div className='add-workspace-container'>
        <form
          className='add-workspace-form'
          onSubmit={(e) => e.preventDefault()}
        >
          <div className='workspace-input-title'>Add Icon</div>
          <label className='custom-file-upload'>
            <p>
              <div> Drop your images here</div>

              <div>or</div>

              <div className='choose-btn'>Choose image files here</div>
              <div>Supported files are JPEG, PNG</div>
            </p>
            <input type='file' placeholder='Choose from file' />
          </label>
          <div className='workspace-input-title'>Name</div>
          <input type='text' placeholder='workspace name' />
          <div className='workspace-input-title'>Add Members</div>
          <TagInput />
        </form>
        <button className='add-project-btn'>
          <img src={tick} alt='' /> Done
        </button>
      </div>
    </div>
  );
};

export default AddWorkspace;
