const AddThread = require("../../../Domains/threads/entities/AddThread")
const AddedThread = require("../../../Domains/threads/entities/AddedThread")
const ThreadRepository = require("../../../Domains/threads/ThreadRepository")
const AddThreadUseCase = require("../AddThreadUseCase")

describe("AddThreadUseCase", () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it("should orchestrating the add thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "dicoding",
      body: "secret",
      owner: "Dicoding Indonesia",
    }
    const expectedAddedThread = new AddedThread({
      id: "thread-123",
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    })

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository() 

    /** mocking needed function */ 
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread))

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    // Action
    const addedUser = await getThreadUseCase.execute(useCasePayload)

    // Assert
    expect(addedUser).toStrictEqual(expectedAddedThread) 
    expect(mockThreadRepository.addUser).toBeCalledWith(new AddThread({
      title: useCasePayload.title, 
      body: useCasePayload.body,
      owner: useCasePayload.owner
    }))
  })
})
