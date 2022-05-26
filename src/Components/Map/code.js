// Split the string and add space between it
function generatePropName(str) {
    return str.replaceAll('_', ' ');
  }
  
  /**
   * Generates the array of Objects for properties in the case when the data is locked
   * @param {array} filterArr - The list of properites to extract from the data to render
   * @param {array} payload - All the properties returned from the API
   * @param {array} initialArr - The initial array with Objects for zoneName and zoneCode
   * @returns [Object]
   */
  function generatePropsArrLockedData(filterArr, payload, message, initialArr) {
    return filterArr.reduce(
      (acc, curr) => {
        if (payload.includes(curr))
          return [
            ...acc,
            {
              propName: generatePropName(curr),
              propVal: message,
              propStatus: 'locked',
            },
          ];
        return acc;
      },
      [...initialArr]
    );
  }
  
  /**
   * Generates the array of Objects for properties in the case when the data is not locked
   * @param {array} filterArr - The list of properites to extract from the data to render
   * @param {array} payload - All the properties returned from the API
   * @param {array} initialArr - The initial array with Objects for zoneName and zoneCode
   * @returns [Object]
   */
  function genereatePropsArrUnlockedData(filterArr, payload, initialArr) {
    return filterArr.reduce(
      (acc, curr) => {
        const propToRender = payload.reduce((finalObj, [propName, propVal]) => {
          return propName === curr ? { [propName]: propVal } : finalObj;
        }, {});
  
        if (propToRender)
          return [
            ...acc,
            {
              propName: generatePropName(curr),
              propVal: propToRender[curr] ?? 'N/A',
              propStatus: 'default',
            },
          ];
        return acc;
      },
      [...initialArr]
    );
  }
  
  /**
   * Destrucuture the available props and return an Object with properites to render
   * @param {boolean} locked - Indicates if the data is locked or not
   * @param {array} availableProps - Properties to render - In locked case they are string of properties that are available for this address and in unlocked case [[propName, propVal], ..]
   * @param {string} message - the message to display in locked case
   * @param {string} zoneCode - the current address zoneCode
   * @param {string} zoneName - the currentAddress zoneName
   * @param {array} pluProps - plus that are available for the current address are passed on the root for locked case
   * @returns {object} - an object of the following form {zoneProps: [], pluProps: [], controlProps: []}
   */
  function destructureAvailableProps(
    locked,
    availableProps,
    message,
    zoneCode,
    zoneName,
    pluProps
  ) {
    if (locked)
   {
      // Generate Zone Props Array
      const zoneDataProps = generatePropsArrLockedData(
        ['zone_type', 'zone_sub_type', 'zone_guide', 'zone_code_link'],
        availableProps,
        message,
        [
          // Start of with these two objects, they are provided on the root of payload, so they are passed seperately to the function as zoneCode and zoneName
          {
            propName: 'Zone Code',
            propVal: zoneCode,
            propStatus: 'default',
          },
          {
            propName: 'Zone Name',
            propVal: zoneName,
            propStatus: 'default',
          },
        ]
      );
  
      // Generate Plu Properites array
      const pluDataProps = generatePropsArrLockedData(
        [
          'single_family_permitted',
          'two_family_permitted',
          'multi_family_permitted',
          'commercial_uses_permitted',
        ],
        [...availableProps],
        message,
        [
          ...pluProps.map((propName) => ({
            propName: generatePropName(propName),
            propVal: message,
            propStatus: 'locked',
          })),
        ]
      );
  
      // Get all the properties that are already extracted for Zone Data and PLU
      const zoneAndPluProps = zoneDataProps
        .concat(pluDataProps)
        .map(({ propName }) => propName);
  
      // Filter out the properites that are already extracted - remaining properties are controls
      const controlProps = availableProps
        .filter(
          (el) =>
            !(
              zoneAndPluProps.includes(generatePropName(el)) ||
              typeof el === 'object'
            )
        ) // filter out the zone and plu props from the availableProps
        .map((el) => ({
          propName: generatePropName(el),
          propVal: message,
          propStatus: 'locked',
        }));
  
      return {
        zone: zoneDataProps,
        plu: pluDataProps,
        controls: controlProps,
      };
    }
    const zoneDataProps = genereatePropsArrUnlockedData(
      [
        'zone_code',
        'zone_name',
        'zone_type',
        'zone_sub_type',
        'zone_guide',
        'zone_code_link',
      ],
      availableProps,
      []
    );
  
    // Explicitly handle the plu object case (where plu's are provided in array in the following form {plu: {..}})
    const pluNestedProps = availableProps
      .filter(([, propVal]) => typeof propVal === 'object' && propVal !== null) // extract the prop from payload where the value is object - those are plu's
      .map(([, propVal]) => {
        return Object.entries(propVal).map(([propName, val]) => ({
          propName: generatePropName(propName),
          propVal: val,
          propStatus: 'default',
        }));
      })
      .flat();
  
    // Extract PLU props data from the incoming array
    const pluDataProps = genereatePropsArrUnlockedData(
      [
        'single_family_permitted',
        'two_family_permitted',
        'multi_family_permitted',
        'commercial_uses_permitted',
      ],
      availableProps,
      pluNestedProps
    );
  
    // Grab the names of all the properties that are extracted for zone data and plu data
    const zoneAndPluProps = zoneDataProps
      .concat(pluDataProps)
      .map(({ propName }) => propName);
  
    const controlProps = availableProps
      .filter(
        ([propName]) =>
          !(
            zoneAndPluProps.includes(generatePropName(propName)) ||
            propName === 'plus'
          )
      )
      .map(([propName, propVal]) => ({
        propName: generatePropName(propName),
        propVal: propVal !== null && !propVal ? `${propVal}` : propVal,
        propStatus: 'default',
      }));
  
    return { zone: zoneDataProps, plu: pluDataProps, controls: controlProps };
  }
  
  export default destructureAvailableProps;