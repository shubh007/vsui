export class VsUiConstants
{
    static readonly BASE_IMAGE_URL_LOCAL = 'http://localhost:9100/vs/';
    static readonly BASE_IMAGE_URL_PROD = 'http://localhost:9100/vs/';
};


export interface DateDetail {
  date: string;
  message: string;
}

export interface ResourceDetail {
  url: string;
  resourceType: string;
  height: number;
  width: number;
}

export interface ResourceAndDateDetail {
  dateDetail: DateDetail;
  order: number;
  resourceDetails: ResourceDetail[];
}

export interface DatesWithResourceResponse {
  resourceAndDateDetails: ResourceAndDateDetail[];
}

export const DateAndResourceDeatails = {
  "resourceAndDateDetails": [
    {
      "dateDetail": {
        "date": "Nov 11, 2020",
        "message": "Dur se Introduction"
      },
      "order": 1,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic1.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic2.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic3.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic4.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic5.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic6.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/firstGivenPics/images/Pic7.jpg",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Apr 10, 2022",
        "message": "Introduction"
      },
      "order": 2,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/firstVideoMeeting/images/firstScreenShot.png",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Apr 10, 2022",
        "message": "1st chat interaction"
      },
      "order": 3,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/firstChat/images/firstChat.png",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "May 22, 2022",
        "message": "1st meeting"
      },
      "order": 4,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/firstMeeting/images/FirstMeetingPic.jpg",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Oct 27, 2022",
        "message": "1st love confessions"
      },
      "order": 5,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-04.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-04 2.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-04 3.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-05.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-05 2.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/confessionOfLove/images/PHOTO-2022-11-13-17-12-05 3.jpg",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Nov 2, 2022",
        "message": "Engagement"
      },
      "order": 6,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-08-22-47-08.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-09-16-02-13.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-12-17-22-10.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-12-19-18-50.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-15-19-21-20.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-15-19-35-14.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/PHOTO-2022-11-15-19-35-56.jpg",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/engagement/images/Purple Flower Watercolor Rustic Wedding Invitation Card.jpg",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Nov 13, 2022",
        "message": "First I love you on call"
      },
      "order": 7,
      "resourceDetails": [
        
      ]
    },
    {
      "dateDetail": {
        "date": "",
        "message": "Cute Creations"
      },
      "order": 8,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/cuteCreations/images/IMG_5959.PNG",
          "resourceType": "IMAGE"
        },
        {
          "url": "http://localhost:9100/vs/cuteCreations/videos/VIDEO-2022-12-19-07-10-33.mp4",
          "resourceType": "VIDEO"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Dec 16, 2022",
        "message": "1st alone interaction"
      },
      "order": 9,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/delhiMeet/videos/VIDEO-2022-12-18-14-40-17.mp4",
          "resourceType": "VIDEO"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Dec 30, 2022",
        "message": "1st Video Call"
      },
      "order": 10,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/firstVideoCall/images/IMG_4333.PNG",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Mar 5, 2023",
        "message": "Wedding"
      },
      "order": 11,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/shadi/images/VIDEO-2023-02-12-07-20-19.mp4",
          "resourceType": "IMAGE"
        }
      ]
    },
    {
      "dateDetail": {
        "date": "Mar 6, 2023",
        "message": "Rest all first"
      },
      "order": 12,
      "resourceDetails": [
        
      ]
    },
    {
      "dateDetail": {
        "date": "",
        "message": "My Cute Bebu"
      },
      "order": 13,
      "resourceDetails": [
        {
          "url": "http://localhost:9100/vs/cuteBaby/videos/VIDEO-2022-12-20-04-36-17.mp4",
          "resourceType": "VIDEO"
        }
      ]
    }
  ]
}