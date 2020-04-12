module.exports = {
  invert(cloned) {
    const data = cloned.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    return cloned;
  },
  noise(cloned) {
    const data = cloned.data;
    const random = ((Math.random() * 70) >>> 0) - 35;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] + random;
      data[i + 1] = data[i + 1] + random;
      data[i + 2] = data[i + 2] + random;
    }
    return cloned;
  },

  blackWhite(cloned) {
    const data = cloned.data;

    for (let i = 0; i < data.length; i += 4) {
      // 将红黄蓝按照一定比例混合，具体比例为0.299 : 0.587 : 0.114， 这个比例需要慢慢调制。
      const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
    return cloned;
  },
  distinct(e) {
    return (cloned) => {
      const data = cloned.data;
      const brightness = +e.target.value;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 200) {
          data[i] = data[i] + brightness > 255 ? 255 : data[i] + brightness;
        }

        if (data[i + 1] < 200) {
          data[i + 1] =
            data[i + 1] + brightness > 255 ? 255 : data[i + 1] + brightness;
        }
        if (data[i + 2] < 200) {
          data[i + 2] =
            data[i + 2] + brightness > 255 ? 255 : data[i + 2] + brightness;
        }
      }
      return cloned;
    };
  },
  brighten(e) {
    return (cloned) => {
      const data = cloned.data;
      const brightness = +e.target.value;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] + brightness > 255 ? 255 : data[i] + brightness;
        data[i + 1] =
          data[i + 1] + brightness > 255 ? 255 : data[i + 1] + brightness;
        data[i + 2] =
          data[i + 2] + brightness > 255 ? 255 : data[i + 2] + brightness;
      }
      return cloned;
    };
  },
};
