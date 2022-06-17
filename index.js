
/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';


/**
 * @param {[]} objectArray 给定的对象数组 
 * const arraydata = [{ key: 'a', value: 'c', name: 'f' }, { key: 'b', value: 'd', name: 'd' }]
 * @param {string} stripProperty 需要剥离的属性
 * @test excludeByProperty(['name'], arraydata) =>
 * [{ key: 'a', value: 'c' }，{ key: 'b', value: 'd' }]
 */
exports.stripPrivateProperties = (stripProperty, objectArray) => {
  try {
    return objectArray.reduce((ret, item) => {
      for (let objkey in item) {
        if (stripProperty.includes(objkey)) {
          delete item[objkey];
        }
      }
      ret.push(item);
      return ret;
    }, []);
  } catch (err) {
    return Promise.reject(err);
  }
};


/**
 * @param {[]} objectArray 给定的对象数组
 * const arraydata = [{ key: 'a', value: 'c' }, { key: 'b', name: 'd' }]
 * @param {string} excludeProperty 需要排除的属性
 * @test excludeByProperty(arraydata, 'name') => [{ key: 'a', value: 'c' }]
 */
exports.excludeByProperty = (excludeProperty, objectArray) => {
  try {
    if (Array.isArray(objectArray)) {
      return objectArray.filter(item => !item[excludeProperty]);
    }
    return [];
  } catch (err) {
    return Promise.reject(err);
  }
};


/**
 * 利用双层嵌套循环
 */
exports.sumDeep = (data) => {
  try {
    return data.map((item) => {
      const sumDeep = item.objects.reduce((res, obj) => {
        let temp = { ...res };
        temp += obj.val;
        return temp;
      }, 0);
      return { objects: sumDeep };
    });
  } catch (err) {
    return Promise.reject(err);
  }
};


/**
 * @param {[{}]} dataSource 数据源
 * @param {[]} statusArray 状态集合
 */
exports.applyStatusColor = (dataSource, statusArray) => {
  try {
    return statusArray.reduce((ret, item) => {
      const findKey = Object.keys(dataSource).find(key => dataSource[key].includes(item.status));
      if (findKey) {
        ret.push({
          status: item.status,
          color: findKey,
        });
      }
      return ret;
    }, []);
  } catch (err) {
    return Promise.reject(err);
  }
};


/**
 * 一等函数
 */
exports.createGreeting = (fn, greeting) => person => `${greeting} ${person}`;


/**
 * 学习了一下一等函数的写法，重新完善了一下题目
 */
exports.setDefaults = (defaultObj) => {
  const fn = (obj) => {
    const tmpObj = { ...obj };
    const tmpDatas = Object.keys(defaultObj).reduce((ret, key) => {
      if (!tmpObj.prototypes.hasOwnProperty.call(key)) {
        tmpObj[key] = defaultObj[key];
      }
      return tmpObj;
    }, {});
    return tmpDatas;
  };
  return fn;
};


/**
 * 根据用户名查找用户所在的公司
 * @param userName
 * @param services
 * @return { company, status, user }
 */
exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
  const status = await services.fetchStatus();
  const usersData = await services.fetchUsers();
  const user = usersData.find(userDt => userDt.name === userName);
  const company = await new Promise((resolve) => {
    if (user && user.companyId) {
      resolve(user.companyId);
    }
  }).then(comId => services.fetchCompanyById(comId));

  return { company, status, user };
};
