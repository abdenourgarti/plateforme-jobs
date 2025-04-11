// resources/js/Components/Jobs/JobList.jsx
const JobList = ({ jobs }) => {
    return (
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">All Jobs ({jobs.length})</h2>
            {jobs.length === 0 ? (
                <p className="text-gray-500">No jobs found for the selected filters.</p>
            ) : (
                jobs.map((job) => (
                    <div key={job.id} className="border p-4 rounded-lg flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <img
                                src={`${job.entreprise.logo}`}
                                alt={job.entreprise.nom}
                                className="w-12 h-12 mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{job.titre}</h3>
                                <p className="text-gray-500">
                                    {job.entreprise.nom} ● {job.location}
                                </p>
                                <div className="mt-2">
                                    <span className="text-sm bg-gray-200 px-2 py-1 rounded mr-2">
                                        {job.categorie.designation}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className="bg-red-500 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default JobList;
