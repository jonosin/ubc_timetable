export type MeetingDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
export type SectionType = 'Lecture' | 'Lab' | 'Discussion' | 'Other'

export interface CourseMeeting {
  id: string
  termLabel: string
  subjectCode: string
  courseNumber: string
  courseTitle: string
  credits: number
  sectionId: string
  sectionType: SectionType
  meetingDay: MeetingDay
  meetingStart: string
  meetingEnd: string
  buildingRoom: string
  deliveryMode: 'In Person' | 'Online' | 'Hybrid'
  startDateISO: string
  endDateISO: string
}
