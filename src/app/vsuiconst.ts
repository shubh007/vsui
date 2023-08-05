export class VsUiConstants
{
    static readonly BASE_IMAGE_URL_LOCAL = 'http://localhost:9100/vs/';
    static readonly BASE_IMAGE_URL_PROD = 'https://apis.varsha.love/vs/';
};
export enum StatusResponseType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    FAILURE = 'FAILURE'
}
export enum ModelActions {
  NO_ACTION = 'NO_ACTION',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}
export enum ResourceType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}
export interface MediaFileDetails{
  eventFile : File;
  height: number,
  width: number,
}
export interface CreateEventRequest{
  eventCardPic: File,
  message: string,
  name: string,
  date: string
}
export interface MemoryFileAndMetaUploadRequest{
  eventFile : File;
  height: number,
  width: number,
  description: string,
  //date: Date
  eventId: string
}
export interface ApiRequest {
  userId: string;
  code: string;
}
export interface ApiResponse {
  statusResponse: StatusResponse;
}
export interface StatusResponse {
  statusCode: number,
  statusMessage: string,
  statusType: StatusResponseType;
  errors: any[];

}
export interface DateDetail {
  date: string;
  name: string;
  message: string;
  cardUrl: string;
  eventId: string;
}
export interface ResourceDetailAddEvent {
  eventId: string;
  resourceDetail: ResourceDetail;
}
export interface ResourceDetail {
  url: string;
  hashFile: string;
  resourceType: ResourceType;
  height: number;
  width: number;
}

export interface ResourceAndDateDetail {
  dateDetail: DateDetail;
  order: number;
  resourceDetails: ResourceDetail[];
}
export interface AuthResponse extends ApiResponse {
  userName: string;
  userId: string;
}
export interface UserDetails {
  userName: string | null;
  userId: string | null;
  godModeCode : string | null;
}
export interface DatesWithResourceResponse extends ApiResponse{
  name: String;
  resourceAndDateDetails: ResourceAndDateDetail[];
}
export interface CreateEventResponse extends ApiResponse{
  resourceAndDateDetail: ResourceAndDateDetail ;
}
export interface AddToEventResponse extends ApiResponse{
  resourceDetail: ResourceDetail ;
}

export const DateAndResourceDeatails = {
    "statusResponse": {
        "statusCode": 1003,
        "statusMessage": "Event fetched successfully",
        "statusType": "SUCCESS",
        "errors": null
    },
    "name": "Varsha Singh",
    "resourceAndDateDetails": [
        {
            "dateDetail": {
                "date": "11-Nov-2020",
                "message": "Dur se Introduction",
                "eventId": "firstGivenPics"
            },
            "order": 1,
            "resourceDetails": [
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2020/11/11/images/event_pic_1689117158054.jpg",
                    "hashFile": "12e2e031488c99a0559cd229cbb3b789",
                    "resourceType": "IMAGE",
                    "height": 446,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2020/11/11/images/event_pic_1689117210449.jpg",
                    "hashFile": "a286064e7cf0abac9c307e6b5aca8de7",
                    "resourceType": "IMAGE",
                    "height": 250,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2020/11/11/images/event_pic_1689117217064.jpg",
                    "hashFile": "1b7d904d46b8c6ab89b7da9f45987e92",
                    "resourceType": "IMAGE",
                    "height": 266,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2020/11/11/images/event_pic_1689117222412.jpg",
                    "hashFile": "f060f5d10a3ea661935c55ecd00dd4d1",
                    "resourceType": "IMAGE",
                    "height": 201,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2020/11/11/images/event_pic_1689117227930.jpg",
                    "hashFile": "6537bc22b2d9e28524c6d4731699ed98",
                    "resourceType": "IMAGE",
                    "height": 300,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2020/11/11/images/event_pic_1689117232970.jpg",
                    "hashFile": "5e16b67668a4b62334921b1f4a4f4e1b",
                    "resourceType": "IMAGE",
                    "height": 198,
                    "width": 200
                }
            ]
        },
        {
            "dateDetail": {
                "date": null,
                "message": "Cute Creations",
                "eventId": "cuteCreations"
            },
            "order": 2,
            "resourceDetails": [
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/cuteCreations/images/event_pic_1689117304642.PNG",
                    "hashFile": "98e6d1b276ddf438b8b017bd097a31bb",
                    "resourceType": "IMAGE",
                    "height": 432,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/cuteCreations/videos/event_pic_1689117316804.mp4",
                    "hashFile": "6bbe085082a1a8749b3123e091743af4",
                    "resourceType": "VIDEO",
                    "height": 400,
                    "width": 300
                }
            ]
        },
        {
            "dateDetail": {
                "date": "05-Mar-2023",
                "message": "Wedding ",
                "eventId": "e6e6d7b6-690a-44bf-b471-42935d26f877"
            },
            "order": 3,
            "resourceDetails": []
        },
        {
            "dateDetail": {
                "date": "02-Nov-2022",
                "message": "We Are Engaged",
                "eventId": "engagement"
            },
            "order": 4,
            "resourceDetails": [
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2022/11/2/images/event_pic_1689264105609.jpg",
                    "hashFile": "91b9682a7a5388b4d7031bc5baa1ed3d",
                    "resourceType": "IMAGE",
                    "height": 250,
                    "width": 200
                },
                {
                    "url": "https://event-memories.s3.eu-north-1.amazonaws.com/C2C587BF5D5E43A8B639D2B0754212A5/2022/11/2/images/event_pic_1689264140699.jpg",
                    "hashFile": "9d4780e589969d25e29457d36d56e54a",
                    "resourceType": "IMAGE",
                    "height": 300,
                    "width": 200
                }
            ]
        }
    ]

    
  
}