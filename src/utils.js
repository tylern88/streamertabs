import { TWITCH_USERS_FOLLOWS, TWITCH_GET_STREAMS, TWITCH_QUERY_STREAMS } from './consts'

export const extractStreamerIds = (usersData) => {
  return usersData.map(userData => userData.to_id)
}

export const  buildFollowsUrl = ({after, from_id, first}) => {
  return `${TWITCH_USERS_FOLLOWS}?from_id=${from_id}${after ? `&after=${after}` : ''}${first ? `&first=${first}` : ''}`
}

export const buildStreamsUrl = ({user_id, user_login, game_id, first=20, before, after}) => {

  if(user_id instanceof Array){
    user_id = user_id.join('&user_id=')
  }
  return `${TWITCH_GET_STREAMS}?${user_id ? `user_id=${user_id}` : ''}${first ? `&first=${first}`: ''}${after ? `&after=${after}` : ''}`
}

export const buildStreamsQueryUrl = ({query, first, after: cursor, liveOnly=false}) => {
  if(query instanceof Array){
    query = query.join('&query=')
  }
  return `${TWITCH_QUERY_STREAMS}?${query ? `query=${query}`:''}${first ? `&first=${first}` : ''}${cursor ? `&after=${cursor}` : ''}&live_only=${liveOnly}`
}

export const reconstructUsersObj = ({userData, dataToAdd}) => {

  const restructuredObj = userData.reduce((acc, ud) => {
    let test
    dataToAdd.forEach((dta)=>{
      if(ud.to_id === dta.user_id){
        test = ([...acc,{ ...ud,...dta}])
      }
      else {
        test = ([...acc, {...ud}])
      }
    })
    return test
  },[])

  return restructuredObj
}