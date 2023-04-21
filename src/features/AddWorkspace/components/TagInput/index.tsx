import React, { useState } from 'react';
import './index.scss';

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setInput(values);
  };
  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };
  const addnewTag = () => {
    const trimmedInput = input.trim();
    setTags((prevState) => [...prevState, trimmedInput]);
    setInput('');
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  return (
    <div className='tag-wrapper'>
      <div className='tag-container'>
        <input
          value={input}
          placeholder='Github Ids of members '
          onKeyUp={onKeyUp}
          onChange={onChange}
        />
        <button onClick={addnewTag}>+ Add</button>
      </div>
      <div className='all-tags-container'>
        {tags.map((tag, index) => (
          <div className='tag' key={index}>
            <img
              src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'
              alt=''
            />
            {tag}
            <button onClick={() => deleteTag(index)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
