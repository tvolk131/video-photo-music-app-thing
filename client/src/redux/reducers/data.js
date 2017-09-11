const initialState = {
  currentProject: {
    owner: {
      name: 'Ian Hubert',
      avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
      jobTitle: 'Visual Effects Artist'
    },
    contributors: [
      {
        name: 'Derek de Lint',
        avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/derek.jpg',
        jobTitle: 'Actor - Thom'
      },
      {
        name: 'Test upload image',
        avatarUrl: 'https://qraft-image-files.s3.amazonaws.com/59456401-acd9-451c-bbae-5d6775814265_ScreenShot2017-09-02at11.31.48AM.png',
        jobTitle: 'did it work?'
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
      name: 'Tears of Steel',
      description: 'Thom just wanted to be an astronaut. His girlfriend Celia just wanted to create robots - and for him to not be freaked out by her cyborg hand.',
      tagline: 'This is the tagline.',
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      projectComponents: [{
        name: 'Fight Scene',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Fight+Scene.jpg',
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
        name: 'End Credits',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/04+End+credits.mp3',
        description: 'This is the final soundtrack for the end credits.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'The Battle',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/03+The+battle.mp3',
        description: 'This is the final soundtrack for the fight scene that ensues as we reach the climax.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Script',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-text-files/Script.txt',
        description: null,
        type: 'text',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'The Dome',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/02+The+dome.mp3',
        description: 'This is the final soundtrack for the scenes throughout the establishing shots and early parts of the movie.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Concept Poster',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Concept+Poster.jpg',
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
        name: 'Final Poster',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/final+Poster.png',
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
        name: '40 years later',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-audio-files/01+40+years+later.mp3',
        description: 'This is the final soundtrack for the openning scene of the movie.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Some guy',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Web Developer'
        }
      },
      {
        name: 'Robo Arm Initial Render',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm+2.jpg',
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
        name: 'Robo Arm Lighting Test',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm.jpg',
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
        name: 'Robo Arm concept',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm+4.jpg',
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
        name: 'Robo Arm Final',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Robo+Arm+3.jpg',
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
        description: 'Big Buck Bunny is one of blender\'s older open projects.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'John Doe',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      {
        name: 'Elephant Dream',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ed_hd_512kb.mp4',
        description: 'Elephant Dream is the first blender open project released.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'John Doe',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Visual Effects Artist'
        }
      },
      {
        name: 'Sintel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/sintel-2048-surround.mp4',
        description: 'Sintel is more recent than Big Buck Bunny but older than Tears of Steal.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'John Doe',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
          jobTitle: 'Visual Effects Artist'
        }
      }]
    },
  },
  searchResults: [
    {
      contentType: 'project',
      name: 'Fred\'s Awesome Project!',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'Fred Zirdung',
        username: 'FredX',
        avatarUrl: 'https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3027/assets/images/photos/staff/fred.jpg'
      },
      featuredComponent: {
        name: 'Example',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
        description: 'This is an example project with an image as its featured component',
        type: 'image',
        isDownloadable: false,
        author: {  
          name: 'Fred Zirdung',
          avatarUrl: 'https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3027/assets/images/photos/staff/fred.jpg',
          jobTitle: 'Software Engineer'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Tears of Steel',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'Brett Kirk',
        username: 'Brett_Kirk',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/29087063?v=4&s=460'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'video',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Get Shwifty',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'Rick Sanchez',
        username: 'PickleRick4Evar',
        avatarUrl: 'https://vignette3.wikia.nocookie.net/deathbattlefanon/images/0/08/2816096-thumbnail_1992608045960713568.jpg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'audio',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Happy Forrest',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'Bob Ross',
        username: 'HappyAccidnnnts420',
        avatarUrl: 'https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'image',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    },
    {
      contentType: 'project',
      name: 'Hamlet\'s Revenge',
      thumbnailUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/stock+male+1.jpeg',
      owner: {
        name: 'William Shakespeare',
        username: '2BorNot2B',
        avatarUrl: 'https://s3-us-west-2.amazonaws.com/find-a-grave-prod/photos/2017/179/1450_1498741918.jpg'
      },
      featuredComponent: {
        name: 'Tears of Steel',
        resourceUrl: 'https://s3-us-west-1.amazonaws.com/qraft-video-files/ToS-4k-1920.mp4',
        description: 'Tears of Steel was part of blender\'s 2012 open movie project. It\'s purpose was to show how powerful the free 3D rendering program truly was.',
        type: 'text',
        isDownloadable: false,
        author: {  
          name: 'Ian Hubert',
          avatarUrl: 'https://s3-us-west-1.amazonaws.com/qraft-image-files/Ian_bw.jpg',
          jobTitle: 'Visual Effects Artist'
        }
      }
    }
  ]
};

const data = (state = initialState, action) => {



  return state;
};

export default data;