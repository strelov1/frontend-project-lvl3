import onChange from 'on-change';

export default (initState, onUpdate) => {
  const state = onChange(initState, function (path, value) {
    console.log('onChange', path, value);
    onUpdate(this);
  });

  // first render
  onUpdate(state);
};
