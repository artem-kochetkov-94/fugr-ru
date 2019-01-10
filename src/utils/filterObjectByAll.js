export default (array, value) =>
  array.filter(function(o) {
    return Object.keys(o).some(function(k) {
      return (
        o[k]
          .toString()
          .toLowerCase()
          .indexOf(value.toLowerCase()) !== -1
      );
    });
  });
