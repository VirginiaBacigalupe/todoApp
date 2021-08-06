import * as ReactNative from 'react-native'
jest.doMock('react-native', () =>
  Object.setPrototypeOf(
    {
      NativeModules: {
        ...ReactNative.NativeModules,
        ReactLocalization: { language: 'en' },
      },
    },
    ReactNative,
  ),
)
