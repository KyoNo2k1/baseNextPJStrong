import { IBaseModel } from '@/shared/schema/shared-types/IBaseModel';


export interface ITeam extends IBaseModel {
  name: string;
  group : string;
  teamOwner : string;
  groupOwner : string;
  quantityMember : number;
  description: string;
  avatar : string ;
  background : string
  status: string;
  id: React.Key,
    createdDate: Date,
    updatedDate: Date,
    createdBy: string,
    updatedBy: string,
}
export const dummyITeamData: ITeam[] = [
  {
    id: '1',
    name: 'Team 1',
    group: 'Group 1',
    teamOwner: 'Owner 1',
    groupOwner: 'Owner 1',
    quantityMember: 5,
    description: 'Description 1',
    avatar: 'Avatar 1',
    background: 'Background 1',
    status: 'Active',
    createdDate: new Date(),
    updatedDate: new Date(),
    createdBy: 'User 1',
    updatedBy: 'User 1',
  },
  // Add more dummy data as needed
];

