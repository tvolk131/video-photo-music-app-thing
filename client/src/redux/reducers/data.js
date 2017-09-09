const initialState = {
  currentProject: {
    owner: {
      name: 'Some guy',
      avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      jobTitle: 'Web Developer'
    },
    contributors: [
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
      {
        name: 'Some guy',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        jobTitle: 'Web Developer'
      },
    ],
    project: {
      name: 'Example Project',
      description: 'This is an example project that houses many project components.',
      tagline: 'This is the tagline.',
      featuredComponent: {
        name: 'Sintel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/sintel-2048-surround.mp4',
        description: 'Sintel (code-named Durian) is a short computer animated film by the Blender Institute, part of the Blender Foundation.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      projectComponents: [{
        name: 'City Scape Concept Art',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Sci+Fi+concept+art+2.jpg',
        description: null,
        type: 'photo',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Big Buck Bunny',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/bbb_sunflower_1080p_60fps_normal.mp4',
        description: 'Big Buck Bunny (code-named Peach) is a 2008 short computer-animated comedy film by the Blender Institute, part of the Blender Foundation.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Poplar St.',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/Glass+Animals+-+Poplar+St.mp3',
        description: 'Poplar St is a song by Glass Animals, originally released in 2016 as part of their album "How to Be a Human Being".',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Lorem Ipsum',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-text-files/Lorem+Ipsum.txt',
        description: null,
        type: 'text',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      }]
    }
  },
  searchResults: [
    {
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      }
    },
    {
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      }
    },
    {
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      }
    },
    {
      name: 'Some cool project',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'John Doe',
        username: 'XxXjohndoeXxX420',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg'
      }
    }
  ]
};

const data = (state = initialState, action) => {



  return state;
};

export default data;