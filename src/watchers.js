import onChange from 'on-change';

export default (initState, onUpdate) => {
  const state = onChange(initState, function () {
    onUpdate(this);
  });

  // first render
  onUpdate(state);
};
