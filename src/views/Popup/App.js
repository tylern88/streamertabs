import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import Live from './live'
import Loading from '../../components/loading'
import OfflineStreams from './offline-streams'
import Favorites from './favorites'
import LoggedOut from './logged-out'
import QueryResults from './query-result'
import { TwitchProvider } from '../hooks/useTwitchProvider'
import { FavoritesProvider } from '../hooks/useFavoritesProvider'
import { NotificationProvider } from '../hooks/useNotificationsProvider'
import UserHeader from '../../components/user-header'
import BmcButton from '../../components/bmc-button'
import Input from '../../components/search-input'
import Menu from './menu'
import { SearchProvider } from '../hooks/useSearchProvider'

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  gap: 8px;
  grid-template-areas:
    'left right'
    'search search';
  background-color: rgb(27, 27, 51, 0.8);
  position: sticky;
  top: 0;
  padding: 9px 0;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 2;
  & > ${Input} {
    grid-area: search;
    justify-self: center;
    width: 300px;
  }
`

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: right;
`

const StreamerSection = styled.section`
  display: grid;
  gap: 16px;
`
const Container = styled.div`
  display: grid;
  min-height: 600px;
`

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
`

const App = () => {
  const { isLoggedIn, isLoading: isLoginLoading, userData, handleLogout, handleUserLogin } = useLogin()
  const { userId, displayName, profileImageUrl } = userData

  const ShowAllSections = () => (
    <>
      <Favorites />
      <Live />
      <OfflineStreams />
    </>
  )

  if (!isLoggedIn) return <LoggedOut handleLogin={handleUserLogin} isLoading={isLoginLoading} />

  return (
    <TwitchProvider userId={userId} isLoggedIn={isLoggedIn}>
      {({ isLoading }) => (
        <FavoritesProvider>
          <SearchProvider>
            <NotificationProvider>
              <Container>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Header>
                      <div>
                        {isLoggedIn && <UserHeader displayName={displayName} profileImageUrl={profileImageUrl} />}
                      </div>
                      <ButtonGroup>
                        <BmcButton />
                      </ButtonGroup>
                      <Input placeholder="Search Twitch Channels" />
                    </Header>

                    {isLoggedIn && (
                      <MainContainer>
                        <Menu handleLogout={handleLogout} />

                        <StreamerSection>
                          <Switch>
                            {/* working on this search */}
                            <Route path="/search" component={QueryResults} />
                            <Route path="/favorites" component={Favorites} />
                            <Route path="/live" component={Live} />
                            <Route path="/offline" component={OfflineStreams} />
                            <Route path="/" component={ShowAllSections} />
                          </Switch>
                        </StreamerSection>
                      </MainContainer>
                    )}
                  </>
                )}
              </Container>
            </NotificationProvider>
          </SearchProvider>
        </FavoritesProvider>
      )}
    </TwitchProvider>
  )
}

export default App
