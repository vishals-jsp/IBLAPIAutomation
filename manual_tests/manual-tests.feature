Feature: Schedule Metadata Manual Tests

Scenario: Validate attribution 
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then master brand is available inside every episode 
And the value of attribution in a master brand is not null or empty
And the value of attribution must match with master brand id

Scenario: Schedule Date and time validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then schedule_start time and before schedule_end time is not null or empty
And schedule_start time is before schedule_end time
And time different between schedule end time and start time must equals to duration
And schedule_end time of current episode matches with schedule_start time of next episode
And no overlap of time between two episodes 

Scenario: Schedule type validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then value of type is not null or empty for any schedule data
And value of type for every item must be "broadcast"
