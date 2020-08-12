<?php

namespace App\Observers;

use App\Altrp\Builders\QueryBuilder2;
use App\Altrp\Query;
use App\Altrp\SourcePermission;
use App\Altrp\SourceRole;
use App\Exceptions\Controller\ControllerFileException;
use App\Exceptions\ModelNotWrittenException;
use App\Exceptions\Repository\RepositoryFileException;
use App\Exceptions\Route\RouteFileException;
use Illuminate\Support\Str;

class AltrpQueryObserver
{
    /**
     * Handle the query "creating" event.
     *
     * @param \App\Altrp\Query $query
     * @return bool|void
     * @throws \App\Exceptions\Repository\RepositoryFileException
     */
    public function creating(Query $query)
    {
        $builder = new QueryBuilder2($query);
        $source = $builder->writeSource($query->name);
        $query->user_id = auth()->user()->id;
        $query->source_id = $source->id;
        $oldQuery = Query::where('source_id', $source->id)->first();
        if ($oldQuery) return false;
    }

    /**
     * Handle the query "created" event.
     *
     * @param \App\Altrp\Query $query
     * @return void
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     * @throws \App\Exceptions\Route\RouteFileException
     * @throws ModelNotWrittenException
     */
    public function created(Query $query)
    {
        $builder = new QueryBuilder2($query);
        $methodBody = $builder->getMethodBody();
        if (! $builder->writeSourceRoles($query->source)) {
            throw new ModelNotWrittenException('Failed to write source roles', 500);
        }
        if (! $builder->writeSourcePermissions($query->source)) {
            throw new ModelNotWrittenException('Failed to write source permissions', 500);
        }
        if (! $builder->writeMethodToController()) {
            throw new ModelNotWrittenException('Failed to write method to controller', 500);
        }
        if (! $builder->writeMethodToRepo($methodBody)) {
            throw new ModelNotWrittenException('Failed to write method to repository', 500);
        }
        if (! $builder->writeRoute()) {
            throw new ModelNotWrittenException('Failed to write routes', 500);
        }
    }

    /**
     * Handle the query "updating" event.
     *
     * @param \App\Altrp\Query $query
     * @return void
     * @throws ModelNotWrittenException
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function updating(Query $query)
    {
        $builder = new QueryBuilder2($query);
        $methodBody = $builder->getMethodBody();
        if (! $builder->updateControllerMethod()) {
            throw new ControllerFileException('Failed to update controller', 500);
        }
        if (! $builder->updateRepoMethod($methodBody)) {
            throw new RepositoryFileException('Failed to update repository', 500);
        }
        if (! $builder->updateRoute()) {
            throw new RouteFileException('Failed to update route', 500);
        }
        if ($query->source) {
            $query->source->update([
                'type' => Str::snake($query->name),
                'name' => ucwords(str_replace('_', ' ',Str::snake($query->name)))
            ]);
        }
        if (! $builder->updateSourceRoles($query->source)) {
            throw new ControllerFileException('Failed to update source roles', 500);
        }
        if (! $builder->updateSourcePermissions($query->source)) {
            throw new ControllerFileException('Failed to update source permissions', 500);
        }
    }

    /**
     * Handle the query "updated" event.
     *
     * @param \App\Altrp\Query $query
     * @return void
     * @throws ModelNotWrittenException
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function updated(Query $query)
    {

    }

    /**
     * Handle the query "deleting" event.
     *
     * @param \App\Altrp\Query $query
     * @return void
     * @throws ModelNotWrittenException
     * @throws \App\Exceptions\Controller\ControllerFileException
     * @throws \App\Exceptions\Repository\RepositoryFileException
     * @throws \App\Exceptions\Route\RouteFileException
     */
    public function deleting(Query $query)
    {
        $builder = new QueryBuilder2($query);
        SourceRole::where('source_id', $query->source->id)->delete();
        SourcePermission::where('source_id', $query->source->id)->delete();
        if (! $builder->removeMethodFromController()) {
            throw new ModelNotWrittenException('Failed to remove method from controller', 500);
        }
        if (! $builder->removeMethodFromRepo()) {
            throw new ModelNotWrittenException('Failed to remove method from repository', 500);
        }
        if (! $builder->removeRoute()) {
            throw new ModelNotWrittenException('Failed to remove route', 500);
        }

    }

    /**
     * Handle the query "deleted" event.
     *
     * @param  \App\Altrp\Query  $query
     * @return void
     */
    public function deleted(Query $query)
    {
        $query->source->delete();
    }

    /**
     * Handle the query "restored" event.
     *
     * @param  \App\Altrp\Query  $query
     * @return void
     */
    public function restored(Query $query)
    {
        //
    }

    /**
     * Handle the query "force deleted" event.
     *
     * @param  \App\Altrp\Query  $query
     * @return void
     */
    public function forceDeleted(Query $query)
    {
        //
    }
}
