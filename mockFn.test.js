test.skip('mock function test', async () => {
    const testFunction = jest.fn().mockRejectedValue(new Error('something bad')).mockResolvedValueOnce(12).mockResolvedValueOnce(13);
    // jest.fn((a,b)=>`${a}--${b}`) is the same as jest.fn().mockImplementation((a,b)=>`${a} ${b}`)
    // jest.fn().mockReturnValue(val)
    // jest.fn().mockImplementation(()=>val1)
    // jest.fn().mockResolvedValue() = jest.fn().mockImplementation((a,b)=>Promise.resolve(a+b))
    // jest.fn().mockRejectedValue() = jest.fn().mockImplementation(()=>Promise.reject(new Error('something bad')))

    await testFunction('brad', 'pitt');
    await testFunction('angelina', 'jolie');
    try {
        await new testFunction('timmy');
    } catch (e) {
        console.log(e.message);
    }
    console.log(testFunction.mock);
});
