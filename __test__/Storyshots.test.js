import initStoryshots from '@storybook/addon-storyshots';

// Mock Fetch
global.fetch = () => new Promise(resolve => resolve({ test: 'Test' }));

initStoryshots();
