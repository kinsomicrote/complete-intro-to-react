// @flow

import moxios from 'moxios';
import { setSearchTerm, addAPIData, getAPIDetails } from '../actionCreators';

const atlanta = {
  title: 'Atlanta',
  year: '2008–2013',
  description: 'Two cousins, with different views on art versus commerce, on their way up through the Atlanta rap scene; "Earnest \'Earn\' Marks," an ambitious college drop-out and his estranged cousin, who suddenly becomes a star.',
  poster: 'a.jpg',
  imdbID: 'tt4288182',
  trailer: 'MpEdJ-mmTlY',
  rating: '0.8',
};

test('setSearchTerm', () => {
  expect(setSearchTerm('New York')).toMatchSnapshot();
});

test('addAPIData', () => {
  expect(addAPIData(atlanta)).toMatchSnapshot();
});

test('getAPIDetails', (done: Function) => {
  const dispatchMock = jest.fn();
  moxios.withMock(() => {
    getAPIDetails(atlanta.imdbID)(dispatchMock);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: atlanta,
        })
        .then(() => {
          expect(request.url).toEqual(`http://localhost:3000/${atlanta.imdbID}`);
          expect(dispatchMock).toBeCalledWith(addAPIData(atlanta));
          done();
        });
    });
  });
});
