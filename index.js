const utils = require( TEST_LOCATION ); // jest global

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
 * @test excludeByProperty(['name'], arraydata) => [{ key: 'a', value: 'c' }， { key: 'b', value: 'd' }]
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
        console.log(err);
    }
};


/**
 * 
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
        console(err);
    }
};


/**
 * 利用双层嵌套循环
 */
exports.sumDeep = (data) => {
    return data.map(item => {
        const sumDeep = item.objects.reduce((res, obj) => {
            res += obj.val;
            return res;
        }, 0);
        return { objects: sumDeep };
    });
};


exports.applyStatusColor = () => {};



/**
 * 一等函数
 */
exports.createGreeting = greeting => person => `${greeting} ${person}`;


/**
 * 这道题我可能取巧了，题目没有要求对象里面key的顺序，就一句话就可以实现
 * 参数有交集不更新，并集更新，直接assign就完事了
 */
exports.setDefaults = ((obj = {}) => Object.assign({}, { subscribed: true }, obj));



exports.fetchUserByNameAndUsersCompany = () => {};
